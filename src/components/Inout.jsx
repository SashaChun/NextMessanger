'use client';

import clsx from 'clsx';

export default function Input({ label, id, type, register, errors, disable }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <div className="mt-2">
                <input
                    type={type}
                    id={id}
                    autoComplete={id}
                    disabled={disable}
                    {...register(id, { required: `${label} is required` })} // Тепер працює правильно
                    className={clsx(
                        'block w-full rounded-md  h-10 shadow-sm  text-black bg-[#2a2c33] px-3 text-5xl sm:text-sm',
                        disable && 'opacity-50 cursor-not-allowed'
                    )}
                />
                {errors?.[id] && <span className="text-red-500 text-xs">{errors[id]?.message}</span>}
            </div>
        </div>
    );
}
