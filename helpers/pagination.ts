interface ObjectPagination {
    currentPage: number,
    limitItem: number,
    skip ?: number,
    totalPage ?: number
}

const PaginationHelper = (objectPagination : ObjectPagination ,query: Record<string,any> ,countItems: number):ObjectPagination=>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page)
    }
    if(query.limit){
        objectPagination.limitItem = parseInt(query.limit)
    }
           
    objectPagination.skip = (objectPagination.currentPage -1) * objectPagination.limitItem

    objectPagination.totalPage = Math.ceil(countItems/objectPagination.limitItem);

    return objectPagination
}
export default PaginationHelper