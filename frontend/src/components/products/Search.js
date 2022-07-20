import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')

    const searchSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim('')) {
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products', {replace: true})
        }
    }
  return (
    <div className='w-full'>
        <form action="" onSubmit={searchSubmit} className="flex items-center gap-3">
            <TextField 
                id="standard-basic" 
                label="Search" 
                variant="filled" 
                color="warning"
                size="small" 
                onChange={(e) => setKeyword(e.target.value)}
                sx={{width: '100%', maxWidth: '800px',margin: '0 auto'}}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton 
                            type='submit' 
                            color="warning" 
                            size="large"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>,
                }}
            />
        </form>
    </div>
  )
}

export default Search