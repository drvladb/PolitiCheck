const wait = (seconds: number) => {
    return new Promise(vars => setTimeout(vars, seconds));
}

export { wait }