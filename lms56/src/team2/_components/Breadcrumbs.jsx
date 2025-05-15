import { useLocation, Link, useParams } from 'react-router-dom'

const Breadcrumbs = () => {
    const location = useLocation()
    const params = useParams()
    const pathnames = location.pathname.split('/').filter((x) => x)
    const team2Index = pathnames.indexOf('team2')
    const relevantPaths = team2Index !== -1 ? pathnames.slice(team2Index) : []

    if (relevantPaths.length === 0) return null

    // Map route segments to display names
    const getDisplayName = (path, index) => {
        // Handle dynamic segments
        if (path === ':courseId' && params.courseId) {
            return 'Хичээл'
        }
        if (path === ':lessonId' && params.lessonId) {
            return 'Хичээлийн даалгавар'
        }
        if (path === ':studentId' && params.studentId) {
            return 'Оюутны илгээлт'
        }
        if (path === ':id' && params.id) {
            return 'Илгээлтийн дэлгэрэнгүй'
        }

        const displayNames = {
            'team2': 'Нүүр хуудас',
            'courses': 'Хичээлүүд',
            'assignments': 'Даалгаврууд',
            'submissions': 'Илгээлтүүд',
            'submission': 'Илгээлтүүдийн тойм',
            'dashboard': 'Хяналтын самбар',
            'submit': 'Даалгавар илгээх',
            'edit': 'Илгээлт засах',
            'feedback': 'Санал хүсэлт',
            'compare': 'Харьцуулах',
            'lesson': 'Хичээл',
            'student': 'Оюутан',
            'teacher': 'Багш',
            'admin': 'Админ'
        }
        return displayNames[path] || path.charAt(0).toUpperCase() + path.slice(1)
    }

    // Get icon for each segment
    const getIcon = (path) => {
        const icons = {
            'team2': (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            ),
            'courses': (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            'assignments': (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            'submissions': (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            'dashboard': (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
            'default': (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
        return icons[path] || icons.default
    }

    return (
        <nav className="flex mb-6 bg-white rounded-lg shadow-sm p-3" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/team2" className="inline-flex items-center text-gray-700 hover:text-blue-600">
                        {getIcon('team2')}
                        {getDisplayName('team2')}
                    </Link>
                </li>
                {relevantPaths.slice(1).map((value, index) => {
                    const last = index === relevantPaths.length - 2
                    const to = `/team2/${relevantPaths.slice(1, index + 2).join('/')}`
                    const displayName = getDisplayName(value, index)

                    return (
                        <li key={to}>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                {last ? (
                                    <span className="ml-1 text-gray-500 md:ml-2 flex items-center">
                                        {getIcon(value)}
                                        {displayName}
                                    </span>
                                ) : (
                                    <Link to={to} className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2 flex items-center">
                                        {getIcon(value)}
                                        {displayName}
                                    </Link>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs 