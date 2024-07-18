'use client';

import { useToast } from '@/components/ui/use-toast';

const useCustomToast = () => {
  const { toast } = useToast();

  const error = ({ des }: { des?: string | undefined | null }) =>
    toast({
      title: 'Uh oh! Something went wrong.',
      description: des || 'There was a problem with your request.',
      variant: 'destructive',
    });

  return { error };
};

export default useCustomToast;
