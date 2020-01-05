export default function getCommonNamespaces(bitmap: any) {

    const namespacesDict = Object.entries(bitmap)
        .filter(([key, _]) => key !== "version")
        .filter(([name, component]: any) => component.origin != "IMPORTED")
        .map(([name, _]) => {
            const match = name.match(/^([^\/]*)/);
            return match ? match[0] : "";
        })
        // Remove the empty ones
        .filter(m => !!m)
        // Extract the number of occurrences
        .reduce((res: any, next: any) => {
            res[next] = res[next] ? 1 : res[next] + 1;
            return res;
        }, {})

    return Object.entries(namespacesDict)
        // Sort by the number of occurrences
        .sort(([name1, occ1]: any, [name2, occ2]: any) => {
            return occ1 - occ2
        })
        // Remove the occurrences
        .map(([key])=>key)

}