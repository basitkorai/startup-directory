'use client'
import { useState, useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Send } from 'lucide-react'
import { Button } from './ui/button'
import { formSchema } from '@/lib/validation'
import z from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState('')
  const router = useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      }

      await formSchema.safeParseAsync(formValues)

      const result = await createPitch(prevState, formData, pitch)

      if (result.status === 'SUCCESS') {
        toast.error('Error', {
          description: 'Please check your inputs and try again!',
        })
        router.push(`/startup/${result?._id}`)
      }
      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors

        setErrors(fieldErrors as unknown as Record<string, string>)
        toast.error('Error', {
          description: 'Please check your inputs and try again!',
        })
        return { ...prevState, error: 'Validation failed', status: 'ERROR' }
      }

      toast.error('Error', {
        description: 'An unexpected error has occured!',
      })
      return {
        ...prevState,
        error: 'An unexpected error has occured',
        status: 'ERROR',
      }
    }
  }
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  })

  return (
    <form action={formAction} className="startup-form bg-white">
      {/* NAME */}
      <div>
        <label htmlFor="name" className="startup-form_label">
          Name
        </label>
        <Input
          id="name"
          name="name"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.name && <p className="startup-form_error">{errors.name}</p>}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_input"
          required
          placeholder="Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Category (Tech, Health, Category)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      {/* IMAGE URL */}
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      {/* MARKDOWN */}
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder:
              'Breifly describe your idea and what problem it solves',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="startup-form_btn bg-red-500 text-white cursor-pointer"
      >
        {isPending ? 'Submitting....' : 'Submit your startup!'}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StartupForm
