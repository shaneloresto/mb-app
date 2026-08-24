'use client';

import { useContext } from 'react';
import MessagesContext from '@/context/MessagesContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

type FormData = {
  messageText: string;
};

const messageSchema = z.object({
  messageText: z
    .string()
    .trim()
    .min(3, { message: "Your message must be at least 3 characters." })
    .max(30, { message: "Your message must be no more than 30 characters." })
});

const EnterMessageForm = () => {
  const { addMessage } = useContext(MessagesContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  });

  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="bg-base-100 border border-base-300 rounded-xl p-8 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-base-content">
              Add Message
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Create a new message for the board
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(data => addMessage(data.messageText))} className="space-y-4">
          <div>
            <label htmlFor="messageText" className="block text-sm font-medium text-base-content mb-1.5">
              Message
            </label>
            <input
              type="text"
              id="messageText"
              autoFocus
              {...register("messageText")}
              placeholder="Enter message (3-30 characters)"
              className={`input input-bordered w-full rounded-lg ${
                errors.messageText ? 'input-error' : ''
              }`}
              aria-describedby={errors.messageText ? "message-error" : undefined}
            />
            {errors.messageText && (
              <p className="text-xs text-error mt-1" id="message-error">
                {errors.messageText.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 mt-2 rounded-lg bg-neutral text-neutral-content font-medium hover:bg-neutral-focus active:scale-[0.99] transition-all flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Post Message"
            )}
          </button>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-base-content/60 hover:text-base-content transition-colors">
              ← Back to messages
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterMessageForm;