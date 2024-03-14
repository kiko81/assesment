const cfg = () => {
        const common = {
                dateFormat: 'd MMM yyyy - HH:mm',
                tzOffset: new Date().getTimezoneOffset() / 60
        }
        const dev = {
                baseUrl: 'http://localhost:40444/trac/'
        }
        const prod = {
                baseUrl: 'http://172.16.20.6:89/trac/'
        }

        return process.env.NODE_ENV === 'production'
                ? { ...prod, ...common }
                : { ...dev, ...common }
}

export default cfg()