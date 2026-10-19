import {Button} from '@task-moon/ui/components/button';
import {Input} from '@task-moon/ui/components/input';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Button>Shared UI button</Button>
        <Input type="email" placeholder="example.com" />
      </main>
    </div>
  );
}
