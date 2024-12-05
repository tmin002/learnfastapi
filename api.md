# API documentation

## Full API List

| name            | type | 
|-----------------|------|
| /sign_in        | POST |
| /sign_up        | POST |
| /sign_out       | POST |
| /unregister     | POST |
| /post_get       | POST |
| /post_upload    | POST |
| /post_delete    | POST |
| /post_update    | POST |

### API success/fail return value
#### success/fail of a certain action in API can be determined whether the reponse status code is 200 OK or not.
 * if success:
> return status code <b>200 OK</b>
 * if fail:
> <b>"409 Conflict"</b>: requested "unique" data exists in server<br>
> <b>"401 Unauthroized"</b>: session id invalid or authentication failure<br>
> <b>"500 Internal Server Error"</b>: internal server error<br>
> * response body can contain detailed explanation of failure if cause of fail can be more than 1:
> <pre>{
>   "detail": "[detailed expalnation of failure]"
> }</pre>

### /sign_in

 * request body
<pre>
{ 
   id = "[user id]", 
   pw = "[user password]" 
}
</pre>

 * response
<pre>
{ 
    session_id = "[session id]"
}
</pre>

### /sign_up

* request body
<pre>
{ 
   id = "[user id]", 
   pw = "[user password]" 
}
</pre>

* response if fail
<pre>
{ 
    detail = "[id already exists / ..]"
}
</pre>

### /sign_out
* request body
<pre>
{ 
    session_id = "[session id]"
}
</pre>

### /unregister
#### * this action ends the current session, then removes user from database
* request body
<pre>
{ 
    session_id = "[session id]"
}
</pre>

### /post_get
* request body
<pre>
{ 
    "id" = [require specific post's content. if used, response will contain single post.]
    "page" = [index of page to get from the list of pages divided by offset. starts from 1]
    "page_count" = [total page count]
    "session_id" = "[session id]"
}
</pre>

* response 
<pre>
{
    posts = [
        {
            "id": "[post id]",
            "title": "[post title]",
            "content": "[post content]"
            "user_id": "[id of user who uploaded the post]",
            "last_modified_datetime": "[post last modified datetime yyyy-mm-dd hh:mm:ss]"
        },
        ... (maximum 50)
    ]
}
</pre>

### /post_upload
* request body
<pre>
{
    "session_id" = "[session id]"
    "title": "[post title]",
    "content": "[post content]"
}
</pre>
* response
<pre>
{
    "id": "[post id]"
}
</pre>


### /post_update
* request body
<pre>
{
    "session_id" = "[session id]"
    "id": "[post id]"
    "title": "[updated post title]",
    "content": "[updated post content]"
}
</pre>

### /post_delete
* request body
<pre>
{
    "session_id" = "[session id]"
    "id": "[post id]"
}
</pre>

