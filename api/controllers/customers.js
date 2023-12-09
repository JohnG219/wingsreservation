import customers from "../models/customers.js";

export const createcustomers = async(req,res,next)=>{
    const newCustomers=new customers(req.body)
    try{
        const savedCustomers=await newCustomers.save()
        res.status(200).json(savedCustomers);
    }catch(err){
        next("err")
    }
};

export const deletecustomers = async (req, res, next) => {
    const customerId = req.params.id;
    try {
      const deletedCustomer = await customers.findByIdAndRemove(customerId);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
      next(err);
    }
  }; 

export const getcustomers = async(req,res,next)=>{
    try{
        const a=await customers.find()
        res.status(200).json(a);
    }catch(err){
        next(err)
    }
};