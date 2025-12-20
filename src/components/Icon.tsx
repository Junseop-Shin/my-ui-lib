import { LucideProps, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

export interface IconProps extends LucideProps {
    icon: LucideIcon;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ icon: IconComponent, className, ...props }, ref) => {
        return (
            <IconComponent
                ref={ref}
                className={cn("h-4 w-4", className)}
                {...props}
            />
        );
    }
);
Icon.displayName = "Icon";
