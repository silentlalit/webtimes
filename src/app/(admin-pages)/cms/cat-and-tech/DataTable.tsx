"use client";

import React, { useState } from "react";
import { Button, Modal, Input } from "@/components";
import styles from "@/styles/catAndTech.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { deleteData, addData } from "@/redux/slices/staticDataSlice";
import { useAppDispatch } from "@/redux/hook";

const { dataTableList, filterInputBox, addTechButton, editDialog } = styles;

const DataTable = ({ title, list, name }: any) => {
  const dispatch = useAppDispatch();
  const [filtering, setFiltering] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const deleteRow = async (row: any) => {
    setLoading(true);

    const { payload }: any = await dispatch(
      deleteData({ key: name, value: row.value })
    );

    if (payload.success) {
      toast.success(`value deleted`);
      setLoading(false);
    } else {
      toast.error(payload.error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={dataTableList}>
        <h3>{title} List</h3>

        <div className={filterInputBox}>
          <label htmlFor={`filter${title}`}>Filter {title}</label>
          <input
            type="text"
            id={`filter${title}`}
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th className="expand">Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((row: any, idx: number) => {
              if (!row.value.toLowerCase().includes(filtering.toLowerCase()))
                return null;
              return (
                <tr key={idx}>
                  {/* <td>{row._id}</td> */}
                  <td>{row.value}</td>
                  <td>
                    <Button
                      icon={<BsFillTrashFill size={18} />}
                      onClick={() => deleteRow(row)}
                      loading={loading}
                      disabled={loading}
                      btnType="type3"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          className={`${addTechButton} flex`}
          onClick={() => setIsOpen(true)}>
          <AiOutlinePlusCircle size={35} />
        </div>
      </div>

      {isOpen && (
        <Modal
          title={`Add a new ${title}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          style={{ width: 500, height: 300 }}>
          <Dialog
            name={name}
            dispatch={dispatch}
            loading={loading}
            setLoading={setLoading}
          />
        </Modal>
      )}
    </div>
  );
};

export default DataTable;

const Dialog = ({ name, dispatch, loading, setLoading }: any) => {
  const [value, setValue] = useState<string>("");

  const addValue = async () => {
    if (!value.length) {
      toast.error("Enter a value to add");
      return;
    }

    setLoading(true);
    console.log("hello");

    const { payload }: any = await dispatch(
      addData({
        key: name,
        data: { label: value, value: value },
      })
    );

    if (payload.success) {
      setValue("");
      toast.success(`data added in ${name}`);
      setLoading(false);
    } else {
      toast.error(payload.error);
      setLoading(false);
    }
  };

  return (
    <div className={editDialog}>
      <Input
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        label="Add a new value"
      />

      <Button
        title="Add"
        btnType="type2"
        wrapperStyle={{ marginTop: 30 }}
        onClick={() => addValue()}
        icon={<AiOutlinePlusCircle size={20} />}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
};
