
import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'
function Dashboard({}) {

  const router = useRouter()
    return (
        <div>

            <h1>That a dashboard</h1>

        
            <Link href="/createform">
          <a>create form</a>
        </Link>

      
        </div>
    )
}

export default Dashboard

