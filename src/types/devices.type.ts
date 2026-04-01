export type DeviceType = 'iphone-15' | 'android' | 'tablet' | 'iphone-14' | 'iphone-13' | 'iphone-12' | 'iphone-11' | 'iphone-x' | 'iphone-8' | 'iphone-7' | 'iphone-se' | 'galaxy-s23' | 'galaxy-s22' | 'galaxy-s21' | 'galaxy-s20' | 'galaxy-note20' | 'galaxy-note10' | 'galaxy-a52' | 'ipad-pro-12.9' | 'ipad-pro-11' | 'ipad-air' | 'ipad-mini';

export interface DeviceConfig {
  label: string
  width: number
  height: number
  borderRadius: number
  notch: boolean
}