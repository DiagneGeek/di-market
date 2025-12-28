
import { insertIn, removeRow, selectTable, updateRow } from "./supabase";
import type { Article } from "../types";
import type { restoreTextDirection } from "chart.js/helpers";

export const getArticles = async ({ nameinclude = "", category = "", maxprice = "" } = {}) => {
  let query = selectTable("Products")

  if (nameinclude.trim() !== "") {
    query = query.textSearch("title", nameinclude);
  }

  if (category.trim() !== "") {
    query = query.eq("category", category);
  }

  if (maxprice.trim() !== "") {
    // up to you how you handle this
    query = query.lte("price", maxprice);
  }
  
  return query;
};

export const addArticle = async (article: Article) => {
    const {data, error: insertError} = await insertIn("Products", [article])

    if (insertError) {
        return {success: false, error: insertError}
    }
    return {success: true}
}

export const updateArticle = async (newValue: {
  id: string,
  title: string,
  description: string,
  price: string,
  category: string,
}) => {
  const id = newValue.id
  const {id: _, ...rest} = newValue

  console.log(rest)

  const {data, error} = await updateRow("Products", {
    where: ['id', parseInt(id)],
    value: rest
  })
  console.log({data, error})
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
