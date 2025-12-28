let show = () => null

export const useToast = () => {
  return {
    show
  }
}

useToast.init = (fn: any) => {
    show = fn
}