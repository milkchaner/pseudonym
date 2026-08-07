import { CATEGORY_BLOCKS_DATA, CATEGORY_WORDS } from '../constants.ts'
import type { Category } from '../constants.ts'
import { GameCache } from '../cache.ts'
import { CategoryBlock } from '../categories.ts'

import { switchPageTo } from '../main.ts'
import { getCurrentTurn } from './aliasGameLeaderboard.ts'

export const SelectionMenu = document.getElementById('selection-menu')
export const FooterElement = document.getElementById('footer')

const menu = SelectionMenu
const startButton = document.getElementById('game-button-start')
const categoryBlocks = CATEGORY_BLOCKS_DATA.map((category) => new CategoryBlock(
    category.id,
    category.displayName,
    category.imagePath,
))

let initialized = false
/* fetch previously toggled ids if any */
let toggledIds: Category[] = GameCache.toggledCategories

function updateButtonState(startButton: HTMLElement) {
    if (toggledIds.length > 0)
        startButton.style.setProperty("--box-color-sat", '65%')
    else
        startButton.style.setProperty("--box-color-sat", '10%')
}

function toggleCategory(block: CategoryBlock, startButton: HTMLElement) {
    block.toggle()
    if (block.toggled)
        toggledIds.push(block.id)
    else
        toggledIds = toggledIds.filter((id) => block.id !== id)

    updateButtonState(startButton)
    GameCache.toggledCategories = toggledIds
}

function onStartButtonPress() {
    GameCache.toggledCategories = toggledIds

    if (toggledIds.length > 0) {
        const includedWords: string[] = []

        toggledIds.forEach((id) => {
            const words: readonly string[] = id === 'custom'
                ? GameCache.customWords
                : CATEGORY_WORDS[id]
            includedWords.push(...words)
        })

        if (includedWords.length > 0) {
            switchPageTo({
                kind: "game",
                game: {
                    words: includedWords,
                    turn: getCurrentTurn()
                }
            })
        }
    }
}

export function initializeMenu() {
    if (initialized) return;

    if (menu && startButton) {
        /* Make the start button have those colors */
        startButton.style.setProperty("--box-color-sat", '10%')
        startButton.addEventListener("click", () => 
                                     onStartButtonPress())

        /* Put all the categories inside the main body element */
        categoryBlocks.forEach((block) => {
            const elem = block.initializeElement(menu)
            elem.addEventListener('click', () => 
                                  toggleCategory(block, startButton))
        })

        updateButtonState(startButton)
        toggledIds.forEach((id) => {
            categoryBlocks.forEach((block) => {
                if (block.id === id) {
                    block.toggle()
                }
            })
        })

        initialized = true;
    } else {
        console.error("Failed to find selection-menu or game-button-start element")
    }
}
