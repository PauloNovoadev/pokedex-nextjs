export function nameFmt(name:string) {
    return(
        name.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    )
}