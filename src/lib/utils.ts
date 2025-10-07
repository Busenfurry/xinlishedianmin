import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 从数组中随机选择指定数量的元素
 * @param array 源数组
 * @param count 选择数量
 * @returns 选中的元素数组
 */
export function getRandomElements<T>(array: T[], count: number): T[] {
  if (count < 1 || array.length === 0) return [];
  
  // 创建数组副本以避免修改原数组
  const shuffled = [...array];
  // 洗牌算法 - Fisher-Yates 洗牌
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 返回前count个元素
  return shuffled.slice(0, Math.min(count, array.length));
}