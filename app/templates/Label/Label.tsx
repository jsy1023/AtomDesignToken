"use client";
import clsx from "clsx";

export const Label = ({
    label,
    required,
}: {
    label: string;
    required?: boolean;
}) => {
    return (
        <p className={"mb-1 text-text-standard"}>  
            <span
                className={clsx("", {
                    "after:content-['*'] after:ml-1 after:text-danger": required,
                })}
            >
                {label}
            </span>
        </p>
    );
};
