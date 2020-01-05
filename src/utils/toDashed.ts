export default function toDashed(original:string){
    return original.replace(/([A-Z])/g, (g) =>`-${g[0]}`).replace(/^-/,"").toLowerCase();
}