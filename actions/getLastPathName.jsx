"use client"

import { usePathname } from 'next/navigation';

const getLastPathSegment = () => {
    const pathName = usePathname();
    const pathSegments = pathName.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment;
};

export default getLastPathSegment;