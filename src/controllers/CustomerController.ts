import asyncHandler from "express-async-handler";
import ErrorResponse from "../messages/ErrorMessage";
import Customer from "../models/Customers";

const createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body);

  res.status(201).json({ success: true, data: customer });
});

const getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json({ success: true, data: customers });
});

const getCustomer = asyncHandler(async (req, res, next) => {
  const _customer = await Customer.findById(req.params.id);

  if (!_customer) {
    next(
      new ErrorResponse(
        `No customer with that id ${req.params.id} was found`,
        404
      )
    );
  }

  const customer = await Customer.findOne();
  res.status(200).json({ success: true, data: customer });
});

const searchCustomer = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  console.log("req.query", req.query);

  if (!name) {
    return next(new ErrorResponse(`No customer with the name ${name} was found`, 404));
  }

  const customer = await Customer.findOne({ name: name });

  console.log("customer", customer);

  res.status(200).json({ success: true, data: customer });


});

const updateCustomer = asyncHandler(async (req, res, next) => {
  const _customer = await Customer.findById(req.params.id);

  console.log("_customer", _customer);

  if (!_customer) {
    next(
      new ErrorResponse(
        `No customer with that id ${req.params.id} was found`,
        404
      )
    );
  }

  const customer = await Customer.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  console.log("customer");

  res.status(200).json({ success: true, data: customer });
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  const customerId = req.params.id;

  if (!customerId) {
    return next(
      new ErrorResponse(`No customer with id ${customerId} found`, 404)
    );
  }

  // Find and delete the customer by ID
  const customer = await Customer.findByIdAndDelete(customerId);

  res.status(200).json({ success: true, data: customer });
});

export {
  createCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
  searchCustomer,
};
