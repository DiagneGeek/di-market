import { createClient } from "@supabase/supabase-js";

export const client = createClient(
    "https://lhtyjckwijzrpiurupfc.supabase.co",
    "sb_secret__BwTG1PScP_WJaTnN909Cg_uxBiiSmy"
)

export const selectTable = (table: string, selected?: string) => {
    return client.from(table).select(selected || '*')
}

export const insertIn = (table: string, toInsert: object, upsert: boolean = false, onConflict?: string) => {
    if (upsert) {
        if (!onConflict) {
            throw new Error("onConflict must be provided for upsert")
        }
        return client.from(table).upsert(toInsert, { onConflict })
    }
    return client.from(table).insert(toInsert)
}

interface Info {
  where: [string, any],
  value: object
}

export const updateRow = (table: string, info: Info) => {
    return client.from(table).update(info.value).eq(...info.where).select()
}

export const removeRow = (table: string, eq: [string, any]) => {
    return client
  .from(table)
  .delete()
  .eq(...eq)
}

export const uploadImage = (bucket: string, path: string, file: any) => {
  return client.storage.
       from(bucket)
      .upload(path, file, {
        contentType: file.type
      })
}


export const getPublicUrl = (bucket: string, filePath: string) => {
    return client.storage.from(bucket).getPublicUrl(filePath)
}

export const removeFile = (bucket: string, fileName: string) => {
   return client
  .storage
  .from(bucket)
  .remove([fileName])
}



