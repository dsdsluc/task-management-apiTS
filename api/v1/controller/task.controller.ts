import PaginationHelper from "../../../helpers/pagination";
import SearchHelper from "../../../helpers/search";
import Task from "../model/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  interface Find {
    deleted: boolean,
    status?: string,
    title ?: RegExp
  }

  const find: Find = {
    deleted: false,
  };

  // Status
  if (req.query.status) {
    find.status = req.query.status.toString();
  }
  // End Status
  // Sort
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;
  }
  //End Sort

  // Pagination
  let initialPagination = {
    currentPage: 1,
    limitItem: 2,
  };
  //Pagination
  const countItems = await Task.countDocuments(find);
  const objectPagination = PaginationHelper(
    initialPagination,
    req.query,
    countItems
  );
  // End Pagination

    // Search
    let objectSearch = SearchHelper(req.query);

    if(req.query.keyword){
        find.title = objectSearch.regex
    }

    // End Search


  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.json(tasks);
};


export const detail = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(task);
};

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id
        

        if(req.body){
            const status: string =req.body.status
            await Task.updateOne({
                _id: id
            },{
                status: status
            })
        }
        res.json({
            code: "200",
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        })
    }
};
export const changeMulti = async (req: Request, res: Response): Promise<void> => {
    try {
        const ids:string[] = req.body.ids
        const key:string = req.body.key
        const value:string = req.body.value
        
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: ids
                },{
                    status : value
                })
                res.json({
                    code: "200",
                    message: "Cập nhật trạng thái thành công!"
                });
                break;
            case "delete":
                await Task.updateMany({
                    _id: ids
                },{
                    deleted: true,
                    deleteAt: new Date()
                })
                res.json({
                    code: "200",
                    message: "Xóa thành công!"
                });
                break;
        
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại"
                })
                break;
        }
        
        
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        })
    }
};
