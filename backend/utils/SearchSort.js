const { json } = require("express");

class SearchSort{
    constructor(query, queryString){
        this.query = query; //Product.find()
        this.queryString = queryString; // {keyword: 'Laptop'}
        //product.find ({"name":"Laptop"})
    
    }
    search(){
       const keyword = this.queryString.keyword?
        {
           name:{
            $regex: this.queryString.keyword, //Laptop laptop 
            $options: "i",
           },
        }
        :{};
        this.query = this.query.find({ ...keyword});
        return this;
    }
    sort(){
        const queryCopy = { ...this.queryString};
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        console.log(queryCopy);

        
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (key) => `$${key}`
        );
            this.query = this.query.find(JSON.parse(queryString));
            return this;
    }
    
    pagination(resultPerPage){ //10
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1); 
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = SearchSort;

