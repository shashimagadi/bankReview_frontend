

import { VariantProps } from 'class-variance-authority'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';


interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
 VariantProps<typeof buttonVariants> {
    isLoading?:boolean;
 
}
const LoadingButton =React.forwardRef<HTMLButtonElement, LoadingButtonProps> (
    (
    {isLoading=false,
         className,
          variant, 
          disabled,
          size,
          children,
           ...props
        },ref
     ) => {
  return (
    <Button 
    ref={ref} 
    variant={variant} 
    size={size} 
    className={cn(className)}
    disabled={isLoading || disabled}
     {...props}
    >
        {isLoading && <Loader2 className='animate-spin h-6 w-6 mr-2' />}
        {children}
    </Button>
  )
}
)


LoadingButton.displayName = "LoadingButton";
export default LoadingButton;