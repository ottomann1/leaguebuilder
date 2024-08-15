"use server"

import { revalidatePath } from "next/cache"

export async function revalidate(){
    console.log("revalidate loaded")
    revalidatePath("/ingame")
}