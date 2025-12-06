
import { insertIn, removeRow, selectTable, updateRow } from "./supabase";
import type { Article } from "../types";

export const getArticles = async () => {
  return selectTable("Products", "*")
}

export const addArticle = async (article: Article) => {
    const {data, error: insertError} = await insertIn("Products", [article])

    if (insertError) {
        return {success: false, error: insertError}
    }
    return {success: true}
}

export const updateArticle = async (newValue: {
  id: string | number,
  title: string,
  description: string,
  price: string,
}) => {
  const id = newValue.id

  const {data, error} = await updateRow("Products", {
    where: ['id', id],
    value: newValue
  }) 
  if (error) {
    return {success: false, error}
  }
  return {success: true}
}

export const deleteArticle = async (id: number) => {
  const {error} = await removeRow("Products", id)
  if (error) {
    return {success: false, error}
  }
  return {success: true}
}
