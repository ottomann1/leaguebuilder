"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function revalidate(){
    revalidatePath("/ingame")
}

export async function redirectHome(){
    revalidatePath("/")
    revalidatePath("/ingame")
    revalidatePath("/champselect")
}

export async function redirectChamp(){
    revalidatePath("/champselect")
    revalidatePath("/ingame")
    revalidatePath("/")
}

export async function redirectIngame(){
    revalidatePath("/champselect")
    revalidatePath("/ingame")
    revalidatePath("/")
}