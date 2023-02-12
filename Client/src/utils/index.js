import { surpriseMePrompts } from "../constants"
import FIleSaver from 'file-saver'
import FileSaver from "file-saver"

export function getRandomPrompts(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt  = surpriseMePrompts[randomIndex]
    console.log(randomPrompt)
    if(randomPrompt ===  prompt) return getRandomPrompts(prompt)
    return randomPrompt
}

export async function downloadImage(id , url){
    FIleSaver.saveAs(url , `ImaGen_${id}.jpg`)
}
