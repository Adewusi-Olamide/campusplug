import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
    console.log('EXAM NOTIFICATION API CALLED')
  try {
    const { examId } = await request.json()

    if (!examId) {
      return Response.json(
        { error: 'Exam ID is required.' },
        { status: 400 }
      )
    }

    const authorization = request.headers.get('authorization')

    if (!authorization?.startsWith('Bearer ')) {
      return Response.json(
        { error: 'Authentication required.' },
        { status: 401 }
      )
    }

    const accessToken = authorization.replace('Bearer ', '')

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken)

    if (userError || !user) {
      return Response.json(
        { error: 'Invalid or expired session.' },
        { status: 401 }
      )
    }

    const { data: exam, error: examError } = await supabaseAdmin
    .from('exam_countdowns')
    .select('*')
    .eq('id', examId)
    .single()

    console.log('EXAM ID FROM CLIENT:', examId)
    console.log('LOGGED IN USER ID:', user.id)
    console.log('EXAM FOUND:', exam)
    console.log('EXAM QUERY ERROR:', examError)

    if (examError || !exam) {
    return Response.json(
        {
        error: 'Exam not found.',
        examId,
        userId: user.id,
        databaseError: examError?.message || null,
        },
        { status: 404 }
    )
    }

    if (exam.user_id !== user.id) {
    return Response.json(
        { error: 'You do not have permission to schedule this exam.' },
        { status: 403 }
    )
    }


    const examDate = new Date(exam.exam_date)

    if (examDate <= new Date()) {
      return Response.json(
        { error: 'Exam time has already passed.' },
        { status: 400 }
      )
    }

    const maxScheduleDate = new Date()
    maxScheduleDate.setDate(maxScheduleDate.getDate() + 30)

    if (examDate > maxScheduleDate) {
      return Response.json(
        {
          error:
            'This exam is more than 30 days away. Email scheduling will be added for longer-term exams later.',
        },
        { status: 400 }
      )
    }

    const formattedDate = examDate.toLocaleString('en-NG', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Lagos',
    })

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [user.email],
      subject: `🔔 ${exam.name} — Exam Time`,
      scheduledAt: examDate.toISOString(),
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 35px 20px;
          color: #172033;
        ">

          <div style="margin-bottom: 28px;">
            <div style="
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 1.5px;
              color: #6d5dfc;
            ">
              CAMPUSPLUG
            </div>

            <h1 style="
              margin: 8px 0 0;
              font-size: 28px;
            ">
              Your exam time has arrived 🎓
            </h1>
          </div>

          <div style="
            background: #f5f3ff;
            border-radius: 16px;
            padding: 24px;
          ">

            <h2 style="margin-top: 0;">
              ${escapeHtml(exam.name)}
            </h2>

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(exam.subject)}
            </p>

            <p>
              <strong>Exam time:</strong>
              ${escapeHtml(formattedDate)}
            </p>

            ${
              exam.description
                ? `
                  <p>
                    <strong>Note:</strong><br />
                    ${escapeHtml(exam.description)}
                  </p>
                `
                : ''
            }

          </div>

          <p style="
            margin-top: 26px;
            line-height: 1.6;
          ">
            Your CampusPlug exam countdown has reached zero.
            Good luck with your exam! 💪
          </p>

          <p style="
            margin-top: 30px;
            color: #777d8c;
            font-size: 13px;
            line-height: 1.5;
          ">
            You received this email because you added this exam
            to your CampusPlug Exam Countdown.
          </p>

        </div>
      `,
    })

    if (error) {
      console.error('RESEND ERROR:', error)

      return Response.json(
        {
          error: error?.message || 'Resend failed to schedule the email.',
          details: error,
        },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      emailScheduled: true,
      emailId: data.id,
    })
  } catch (error) {
    console.error('Exam notification error:', error)

    return Response.json(
      {
        error: 'Failed to schedule exam notification.',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { examId } = await request.json()

    if (!examId) {
      return Response.json(
        { error: 'Exam ID is required.' },
        { status: 400 }
      )
    }

    const authorization = request.headers.get('authorization')

    if (!authorization?.startsWith('Bearer ')) {
      return Response.json(
        { error: 'Authentication required.' },
        { status: 401 }
      )
    }

    const accessToken = authorization.replace('Bearer ', '')

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken)

    if (userError || !user) {
      return Response.json(
        { error: 'Invalid or expired session.' },
        { status: 401 }
      )
    }

    const { data: exam, error: examError } = await supabaseAdmin
      .from('exam_countdowns')
      .select('id, user_id, resend_email_id')
      .eq('id', examId)
      .single()

    if (examError || !exam) {
      return Response.json(
        { error: 'Exam not found.' },
        { status: 404 }
      )
    }

    if (exam.user_id !== user.id) {
      return Response.json(
        { error: 'You do not have permission to delete this exam.' },
        { status: 403 }
      )
    }

    // Cancel the scheduled Resend email
    if (exam.resend_email_id) {
      const { error: cancelError } = await resend.emails.cancel(
        exam.resend_email_id
      )

      if (cancelError) {
        console.error('RESEND CANCEL ERROR:', cancelError)
      }
    }

    return Response.json({
      success: true,
      emailCancelled: Boolean(exam.resend_email_id),
    })
  } catch (error) {
    console.error('Exam deletion notification error:', error)

    return Response.json(
      { error: 'Failed to cancel exam notification.' },
      { status: 500 }
    )
  }
}


function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
