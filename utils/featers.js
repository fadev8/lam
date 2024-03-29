class Features{

    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        //excluding some features
        let queryObj = {...this.queryString};
        const excludedFields = ['sort,limit,page,fields'];
        excludedFields.forEach(element => delete queryObj[element]);

        //consideration other operators
        let queryStr = JSON.stringify(queryObj);
        queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('-postedat');
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit *1 || 10;
        const skip = (page -1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = Features;