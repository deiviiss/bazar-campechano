export const sleep = async (seconds: number) => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  }

  )
}
