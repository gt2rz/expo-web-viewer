import type { DEVICES } from "../constants/devices.constants"

export interface DeviceConfig {
  label: string
  width: number
  height: number
  borderRadius: number
  notch: boolean
}

export type DeviceType = keyof typeof DEVICES;