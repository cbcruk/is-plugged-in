type BatteryManager = {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  addEventListener: (type: string, listener: () => void) => void
}

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryManager>
}

const app = document.getElementById('app')!

function render(pluggedIn: boolean): void {
  app.innerHTML = `
    <div class="status">${pluggedIn ? '🔌' : '🔋'}</div>
    <div class="label">${pluggedIn ? 'Plugged In' : 'On Battery'}</div>
  `
}

function renderError(message: string): void {
  app.innerHTML = `<div class="error">${message}</div>`
}

async function init(): Promise<void> {
  if (!('getBattery' in navigator)) {
    renderError(
      'Battery Status API is not supported in this browser. Try using Chrome or Edge on desktop.'
    )
    return
  }

  try {
    const battery = await (navigator as NavigatorWithBattery).getBattery()

    render(battery.charging)

    battery.addEventListener('chargingchange', () => {
      render(battery.charging)
    })
  } catch (error) {
    renderError(`Failed to get battery status: ${error}`)
  }
}

init()
