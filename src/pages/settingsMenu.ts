import { GameCache } from "../cache.ts"
import { DefaultValue_teamOneName, DefaultValue_teamTwoName } from "../constants.ts"
import { switchPageTo, currentPage } from "../main.ts"

export const SettingsMenu = document.getElementById('settings-menu')
const settingsButton = document.getElementById('header-button-settings')

/* inputs */
const teamOneNameInput = document.getElementById('settings-team1-name') as HTMLInputElement
const teamTwoNameInput = document.getElementById('settings-team2-name') as HTMLInputElement
const roundTimeSelect  = document.getElementById('settings-round-time') as HTMLSelectElement
const customWordsInput = document.getElementById('settings-custom-words') as HTMLTextAreaElement

function handleTeamNameChange(teamOne: boolean, value: string) {
    let trimmed = value.trim()
    if (trimmed === '') {
        if (teamOne) trimmed = DefaultValue_teamOneName
        else         trimmed = DefaultValue_teamTwoName
    }

    if (teamOne) GameCache.teamOneName = trimmed
    else         GameCache.teamTwoName = trimmed

}

export function initializeSettings() {
    if (!settingsButton || !teamOneNameInput || !teamTwoNameInput ||
        !roundTimeSelect || !customWordsInput)
        return

    settingsButton.addEventListener('click', () => {
        if (currentPage.kind !== 'settings')
            switchPageTo({kind: 'settings'})
        else
            switchPageTo({kind: 'menu'})
    })

    teamOneNameInput.addEventListener('change',
        () => handleTeamNameChange(true, teamOneNameInput.value))
    teamOneNameInput.addEventListener('focusout', () => {
        const trimmed = teamOneNameInput.value.trim()
        teamOneNameInput.value = trimmed !== '' ? trimmed : DefaultValue_teamOneName
    })
    teamOneNameInput.value = GameCache.teamOneName

    teamTwoNameInput.addEventListener('change',
        () => handleTeamNameChange(false, teamTwoNameInput.value))
    teamTwoNameInput.addEventListener('focusout', () => {
        const trimmed = teamTwoNameInput.value.trim()
        teamTwoNameInput.value = trimmed !== '' ? trimmed : DefaultValue_teamTwoName
    })
    teamTwoNameInput.value = GameCache.teamTwoName

    roundTimeSelect.addEventListener('change', () => {
        const time = Number.parseInt(roundTimeSelect.value)
        GameCache.roundTime = time
    })
    roundTimeSelect.value = GameCache.roundTime.toString()

    customWordsInput.value = GameCache.customWords.join('\n')
    customWordsInput.addEventListener('change', () => {
        GameCache.customWords = customWordsInput.value.split(/[\n,;]+/)
        customWordsInput.value = GameCache.customWords.join('\n')
    })
}

export function toggleSettingsButton(on: boolean) {
    if (!settingsButton) return;

    if (on) settingsButton.style.display = ''
    else    settingsButton.style.display = 'none'
}
