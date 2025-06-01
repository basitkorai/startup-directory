import Form from 'next/form'
import SearchResetForm from './SearchResetForm'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <div>
      <Form action="/" scroll={false} className="search-form">
        <input
          defaultValue={query}
          placeholder="Search Startups"
          name="query"
          className="search-input"
          id="input-hero"
        />

        <div className="flex gap-2">
          {query && <SearchResetForm />}

          <Button
            type="submit"
            className="search-btn text-white cursor-pointer"
          >
            <Search />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SearchForm
