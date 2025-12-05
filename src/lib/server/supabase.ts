import { createClient } from "@supabase/supabase-js";

export const client = createClient(
    "https://lhtyjckwijzrpiurupfc.supabase.co",
    "sb_secret__BwTG1PScP_WJaTnN909Cg_uxBiiSmy"
)

export const selectTable = (table: string, selected?: string) => {
    return client.from(table).select(selected || '*')
}

export const insertIn = (table: string, toInsert: object) => {
    return client.from(table).insert(toInsert)
}

interface Info {
  where: [string, any],
  value: object
}

export const updateRow = (table: string, info: Info) => {
    const newValue: any = {}
    newValue[info.where[0]] = info.value
    return client.from(table).update(newValue).eq(...info.where).select()
}

export const removeRow = (table: string, id: number) => {
    return client
  .from(table)
  .delete()
  .eq('id', id)
}

export const uploadImage = (bucket: string, path: string, file: any) => {
  return client.storage.
       from(bucket)
      .upload(path, file)
}


export const getImageUrl = (bucket: string, filepath: string) => {
    return client.storage.from(bucket).getPublicUrl(filePath)
}

