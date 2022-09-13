import React from "react"
import useSWR from "swr"

const index = () => {
  const fetchWithToken = async (url, token) => {
    const headers = new Headers()

    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    headers.append("Authorization", `Bearer ${token}`)

    const response = await fetch(url, {
      method: "GET",
      headers,
    })

    return response
  }

  const { data: collections } = useSWR(
    [
      "https://api.intercom.io/help_center/collections",
      "dG9rOjFkOGIzODRmXzEyY2ZfNDRjMV85NDg3Xzk3NDFjYTE3OGZmMjoxOjA=",
    ],
    fetchWithToken
  )
  console.log(collections)
  console.log(5)
  return <div>UA PArtners page</div>
}

export default index
