import { request } from "@core/request"

export const useMessages = () => {
  const fetch = async () => {
    const response = await request({
      url: "api"
    })
  }
}