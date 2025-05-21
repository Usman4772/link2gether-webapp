"use client";
import {Breadcrumb} from "antd";
import {ChevronRightIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {capitalize} from "@/utils/frontend/helpers/globals";

const BreadCrumbs = () => {
    const pathname = usePathname();

    const generateBreadcrumbs = () => {
        const paths = pathname.split("/").filter((item) => item) as any;
        let processedPaths = [...paths];

        if (!isNaN(paths[paths.length - 1])) {
            const lastSegment = processedPaths.pop();
            processedPaths.push(`${lastSegment}`);
        }

        return [
            {
                title:
                    pathname === "/" ? (
                        <span
                            className={"text-neutral-400 "}
                        >
              Home
            </span>
                    ) : (
                        <Link
                            href="/"
                            className={" !font-normal text-[#353535]"}
                        >
                            Home
                        </Link>
                    ),
            },
            ...processedPaths.map((path, index) => ({

                title: (
                    <>
                        {index === processedPaths.length - 1 ? (
                            <span
                                className={"text-[#353535] font-medium"}
                            >
                {capitalize(path)}
              </span>
                        ) : path=="community" ? (
                            <span
                                className={" !font-normal text-[#353535]"}
                            >
                                {capitalize(path)}
                            </span>
                        ): (
                        <Link
                            href={`/${path}`}
                            className={" !font-normal text-[#353535]"}
                        >
                            {capitalize(path)}
                        </Link>
                        )}
                    </>
                ),
            })),
        ];
    };

    return (
        <Breadcrumb
            items={generateBreadcrumbs()}
            className="flex items-center "
            separator={
                <ChevronRightIcon
                    className={`!text-neutral-400`}
                />
            }
        />
    );
};

export default BreadCrumbs;


