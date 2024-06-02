/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { useField, ErrorMessage } from "formik";
import Image from "next/image";
// import styles from "./styles.module.scss";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
}));

function getStyles(name: string, personName: string, theme: any) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({
    data,
    handleChange,
    value,
    name,
    header,
    disabled,
    ...rest
}: any) {
    const [subs, setSubs] = useState(data || []);
    const [field, meta] = useField(rest) as any;
    useEffect(() => {
        setSubs(data);
    }, [data]);
    const result = data.length
        ? data.reduce((obj: any, cur: any) => ({ ...obj, [cur._id]: cur.name }), {})
        : {};

    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    /*
    const handleChange = (event) => {
      setPersonName(event.target.value);
    };
    */

    /*
    const handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setPersonName(value);
    };
   */

    return (
        <div className="mt-5 w-full">
            <div
                className={`border border-b-border-[#ccc] flex flex-col text-lg p-[10px]  ${meta?.error[name] ? "text-red-600" : ""
                    }`}
            >
                <div className={"flex items-center gap-1"}>
                    {meta.error[name] && <Image src="/images/warning.png" alt="warning"
                        width={100}
                        height={100}
                    />}
                    {header}
                </div>
                <span>
                    {meta.touched && meta.error.subCategories && (
                        <div className={"text-red-600"}>
                            <span></span>
                            <ErrorMessage name={name} />
                        </div>
                    )}
                </span>
            </div>
            <FormControl className={classes.formControl}>
                {/*
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel> */}
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    onChange={handleChange}
                    name={name}
                    disabled={disabled}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected: any) => (
                        <div className={classes.chips}>
                            {selected.map((value: any) => (
                                <Chip
                                    key={value}
                                    label={result[value]}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                >
                    {result &&
                        Object.keys(result).map((id) => (
                            <MenuItem key={id} value={id}>
                                <Checkbox checked={value.indexOf(id) > -1} />
                                <ListItemText primary={result[id]} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}
