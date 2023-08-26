"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSaved, setSaved] = useState(false);
    const [isButtonMode, setIsButtonMode] = useState(true);

    const updateCoolText = async (id: number, newText: string) => {
        const data = await fetch(
            "http://localhost:8080/api/coolText/" + id + "?newText=" + newText,
            {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                },
                method: "PUT",
            }
        )
            .then(async (data) => await data.json())
            .catch((error) => {
                console.log(error);
                return null;
            });

        console.log(data);
    };

    const getCoolText = async (id: number) => {
        const data = await fetch("http://localhost:8080/api/coolText/" + id, {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        })
            .then(async (data) => await data.json())
            .catch((error) => {
                console.log(error);
                return null;
            });

        data && setText(data.text);

        console.log(data);
    };

    const createCoolText = async () => {
        const response = await fetch("http://localhost:8080/api/coolText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
            }),
        });

        if (response.status === 200) {
            const coolText = await response.json();

            localStorage.setItem("coolTextId", coolText.id);

            setText(coolText.text);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);

        const existingTextId = localStorage.getItem("coolTextId");

        if (existingTextId) {
            if (text === "") await getCoolText(Number(existingTextId));
            else await updateCoolText(Number(existingTextId), text);
        } else if (text !== "") await createCoolText();

        setIsLoading(false);

        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 800);
    };

    useEffect(() => {
        if (isButtonMode) return;

        setIsLoading(true);

        const delayDebounceFn = setTimeout(() => {
            const existingTextId = localStorage.getItem("coolTextId");

            if (existingTextId) {
                if (text === "") getCoolText(Number(existingTextId));
                else updateCoolText(Number(existingTextId), text);
            } else {
                if (text !== "") createCoolText();
            }
            setIsLoading(false);

            setSaved(true);
            setTimeout(() => {
                setSaved(false);
            }, 800);
        }, 1500);

        return () => clearTimeout(delayDebounceFn);
    }, [text]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex flex-col justify-between items-start gap-y-8 transition-all">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Default input
                </label> */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        // value={mode}
                        className="sr-only peer"
                        onChange={(ev) => setIsButtonMode(ev.target.checked)}
                        defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-base font-semibold text-gray-900 dark:text-gray-300">
                        {isButtonMode ? "Button Mode" : "Debounced Mode"}
                    </span>
                </label>
                <div className="flex flex-row justify-between items-center gap-x-3 transition-all">
                    <input
                        value={text}
                        onChange={(ev) => setText(ev.target.value)}
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {isButtonMode && (
                        <div>
                            <button
                                className="border rounded-md border-blue-900 hover:bg-blue-600 p-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    )}

                    {isLoading && (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    )}

                    {showSaved && (
                        <div
                            role="status"
                            className="duration-75 ease-in-out transition-all"
                        >
                            <svg
                                className="h-8 w-8 text-green-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {" "}
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
