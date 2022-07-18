class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this;
    }
    filter () {
        const queryCopy = {...this.queryStr}

        const removedFields = ['keyword', 'page', 'limit']
        removedFields.forEach(e => delete queryCopy[e])

        let newQuery = JSON.stringify(queryCopy)

        newQuery = newQuery.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(newQuery))
        return this;
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this;
    }
}

export default APIFeatures;