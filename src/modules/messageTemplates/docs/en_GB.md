This is a pretty simple module, designed to make it easier to send reptitive messages, this is especially useful for (co-)admins.

## Chat-Messages

These are messages to be inserted into the alliance chat. They won't be automatically sent, alllowing you to edit them beforehand.

![chat](assets/en_GB/chat.png)

## Templates

These are templated for private messages, these support the variables.

![messages](assets/en_GB/messages.png)

## Variables

### Username
<span v-pre>`{{username}}`</span> can be used to insert the recipients username.

::: warning New Messages Only
This variable only works in new messages, as it is not possible for us to get the recipient from existing messages
:::

### Date

<span v-pre>`{{today}}`</span> can be used to insert todays date.
If you wish to insert another date, you can use <span v-pre>`{{today+7}}`</span> to insert a date 7 days in the future, or <span v-pre>`{{today-7}}`</span> to insert a date 7 days in the past.
