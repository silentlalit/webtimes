"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Loader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GrFormView } from "react-icons/gr";
import { Order } from "@/utils/interface";

import styles from "@/styles/userOrder.module.scss";
import { getAllOrders } from "@/redux/slices/orderSlice";
import { usePathname, useRouter } from "next/navigation";
import { trimContent } from "@/utils/utileFun";

const { dataTableList, filterInputBox } = styles;

const Page = () => {
  const { logggedInUser } = useAppSelector((state: any) => state.authUser);
  const { orders, loading } = useAppSelector((state: any) => state.order);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState<Order[]>([]);
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (logggedInUser?._id) dispatch(getAllOrders(logggedInUser._id));
  }, [logggedInUser?._id, dispatch]);

  useEffect(() => {
    setFilteredList(orders);

    return () => {
      setFilteredList([]);
    };
  }, [orders]);

  const filterHandler = (e: any) => {
    setFilter(e.target.value);
    setFilteredList((prev: any) => {
      if (!filter) return orders;

      prev = orders.filter((pr: any) => {
        if (
          pr._id.includes(filter) ||
          pr?.projectName?.includes(filter) ||
          pr.service.name.includes(filter)
        ) {
          return true;
        }
        return false;
      });

      return prev;
    });
  };

  if (loading)
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Loader />
      </div>
    );

  return (
    <div className={dataTableList}>
      <h2>List of orders</h2>

      <div className={filterInputBox}>
        <Input
          label="Filter Orders by name or Id"
          value={filter}
          onChange={filterHandler}
        />
      </div>

      <div style={{ overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Project</th>
              <th>Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredList?.map((row: any, idx: number) => (
              <tr key={idx}>
                <td>{trimContent(row._id, 25)}...</td>
                <td>{row.projectName || row.user.name}</td>
                <td>{row.service.name}</td>
                <td>{row.status}</td>
                <td>
                  <Button
                    icon={<GrFormView size={25} />}
                    btnType="type3"
                    onClick={() => push(`${pathname}/${row._id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
