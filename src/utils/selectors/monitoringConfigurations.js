export function getActiveConfigurations (configs){
    return configs.filter(c => c.active===true);
}
export function getInActiveConfigurations (configs){
    return configs.filter(c => c.active===false);
}
