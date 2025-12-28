let show: any = () => null

export const useToast = () => {
  return {
    show
  }
}

useToast.init = (fn: (message: string, type?: string, duration?: number) => void) => {
    show = fn
}