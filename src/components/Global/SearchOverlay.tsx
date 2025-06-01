"use client"

import { useState, useEffect, useRef } from "react"
import { Input, Tabs, List, Avatar, Badge, Tag, Spin, Empty, Typography, Space, Button, ConfigProvider } from "antd"
import {
    SearchOutlined,
    CloseOutlined,
    UserOutlined,
    TeamOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    FireOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons"
import Loading from "@/components/Global/Loading";
import useSearch from "@/hooks/useSearch";

const { Text, Title } = Typography
const { TabPane } = Tabs

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}

// Mock data - replace with your actual API calls
const mockSearchResults = {
    communities: [
        {
            id: 1,
            name: "React Developers",
            description: "A community for React developers to share knowledge",
            members: 15420,
            avatar: "/community-1.jpg",
            isJoined: true,
        },
        {
            id: 2,
            name: "Web Design",
            description: "Beautiful web design inspiration and tutorials",
            members: 8930,
            avatar: "/community-2.jpg",
            isJoined: false,
        },
        {
            id: 3,
            name: "JavaScript Masters",
            description: "Advanced JavaScript concepts and best practices",
            members: 12340,
            avatar: "/community-3.jpg",
            isJoined: true,
        },
    ],
    posts: [
        {
            id: 1,
            title: "How to optimize React performance in 2024",
            author: "john_doe",
            community: "React Developers",
            likes: 234,
            comments: 45,
            timeAgo: "2h ago",
        },
        {
            id: 2,
            title: "CSS Grid vs Flexbox: When to use what?",
            author: "sarah_design",
            community: "Web Design",
            likes: 189,
            comments: 32,
            timeAgo: "4h ago",
        },
        {
            id: 3,
            title: "Modern JavaScript ES2024 features you should know",
            author: "alex_dev",
            community: "JavaScript Masters",
            likes: 156,
            comments: 28,
            timeAgo: "6h ago",
        },
    ],
    users: [
        {
            id: 1,
            username: "john_doe",
            displayName: "John Doe",
            avatar: "/user-1.jpg",
            followers: 1240,
            isFollowing: false,
        },
        {
            id: 2,
            username: "sarah_design",
            displayName: "Sarah Wilson",
            avatar: "/user-2.jpg",
            followers: 890,
            isFollowing: true,
        },
        {
            id: 3,
            username: "alex_dev",
            displayName: "Alex Rodriguez",
            avatar: "/user-3.jpg",
            followers: 2100,
            isFollowing: false,
        },
    ],
}

const recentSearches = ["React hooks", "CSS animations", "Next.js tutorial", "JavaScript tips", "UI components"]

const trendingTopics = ["#ReactJS", "#WebDev", "#CSS", "#JavaScript", "#NextJS", "#TypeScript", "#AI", "#Design"]

export default ({isOpen, onClose}: SearchOverlayProps) => {
    const [searchResults, setSearchResults] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("all")
const {searchQuery, setSearchQuery,data}=useSearch()
    const inputRef = useRef<any>(null)

    // Custom theme for green color scheme
    const theme = {
        token: {
            colorPrimary: "#1a936f",
            colorPrimaryHover: "#22a77f",
            colorPrimaryActive: "#157a5c",
            colorPrimaryBg: "rgba(123, 241, 168, 0.1)",
        },
    }

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    // Focus input when overlay opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])

    // Mock search function
    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults(null)
            return
        }

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setSearchResults(mockSearchResults)
            setIsLoading(false)
        }, 500)
    }

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(searchQuery)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery])

    if (!isOpen) return null

    const tabItems = [
        {
            key: "all",
            label: "All",
            children: <AllResults results={searchResults} />,
        },
        {
            key: "communities",
            label: (
                <Space>
                    <TeamOutlined />
                    Communities
                </Space>
            ),
            children: <CommunitiesResults communities={searchResults?.communities || []} />,
        },
        {
            key: "posts",
            label: (
                <Space>
                    <FileTextOutlined />
                    Posts
                </Space>
            ),
            children: <PostsResults posts={searchResults?.posts || []} />,
        },
        {
            key: "users",
            label: (
                <Space>
                    <UserOutlined />
                    Users
                </Space>
            ),
            children: <UsersResults users={searchResults?.users || []} />,
        },
    ]

    return (
        <ConfigProvider theme={theme}>
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style={{ backdropFilter: "blur(4px)" }}>
                <div className="flex items-start justify-center min-h-screen pt-16 px-4">
                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                        {/* Search Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-4">
                                <Input
                                    ref={inputRef}
                                    size="large"
                                    placeholder="Search communities, posts, users..."
                                    prefix={<SearchOutlined style={{ color: "#1a936f" }} />}
                                    suffix={<Button type="text" icon={<CloseOutlined />} onClick={onClose} style={{ color: "#666" }} />}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        borderRadius: "8px",
                                        border: "2px solid #f0f0f0",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#1a936f"
                                        e.target.style.boxShadow = "0 0 0 2px rgba(26, 147, 111, 0.1)"
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#f0f0f0"
                                        e.target.style.boxShadow = "none"
                                    }}
                                />
                                <Tag color="default" style={{ fontSize: "12px",padding: "4px 12px", borderRadius: "20px" }}>
                                    ESC to close
                                </Tag>
                            </div>
                        </div>

                        {/* Search Content */}
                        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loading/>
                                </div>
                            ) : searchResults ? (
                                <div className="p-6">
                                    <Tabs
                                        activeKey={activeTab}
                                        onChange={setActiveTab}
                                        items={tabItems}
                                        size="large"
                                        tabBarStyle={{ marginBottom: "24px" }}
                                    />
                                </div>
                            ) : (
                                <EmptySearchState
                                    recentSearches={recentSearches}
                                    trendingTopics={trendingTopics}
                                    onSearchClick={setSearchQuery}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

function AllResults({ results }: { results: any }) {
    if (!results) return null

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Communities Section */}
            {results.communities.length > 0 && (
                <div>
                    <Title level={5} style={{ marginBottom: "16px", color: "#1a936f" }}>
                        <TeamOutlined style={{ marginRight: "8px" }} />
                        Communities
                    </Title>
                    <CommunitiesResults communities={results.communities.slice(0, 3)} />
                </div>
            )}

            {/* Posts Section */}
            {results.posts.length > 0 && (
                <div>
                    <Title level={5} style={{ marginBottom: "16px", color: "#1a936f" }}>
                        <FileTextOutlined style={{ marginRight: "8px" }} />
                        Posts
                    </Title>
                    <PostsResults posts={results.posts.slice(0, 3)} />
                </div>
            )}

            {/* Users Section */}
            {results.users.length > 0 && (
                <div>
                    <Title level={5} style={{ marginBottom: "16px", color: "#1a936f" }}>
                        <UserOutlined style={{ marginRight: "8px" }} />
                        Users
                    </Title>
                    <UsersResults users={results.users.slice(0, 3)} />
                </div>
            )}
        </Space>
    )
}

function CommunitiesResults({ communities }: { communities: any[] }) {
    return (
        <List
            dataSource={communities}
            renderItem={(community) => (
                <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    style={{ padding: "12px" }}
                    actions={[
                        <Button
                            key="join"
                            type={community.isJoined ? "default" : "primary"}
                            size="small"
                            icon={community.isJoined ? <CheckCircleOutlined /> : undefined}
                        >
                            {community.isJoined ? "Joined" : "Join"}
                        </Button>,
                        <ArrowRightOutlined key="arrow" style={{ color: "#1a936f" }} />,
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                size={48}
                                src={community.avatar || "/default-community.png"}
                                icon={<TeamOutlined />}
                                style={{ border: "2px solid #f0f0f0" }}
                            />
                        }
                        title={
                            <Space>
                                <Text strong style={{ fontSize: "16px" }}>
                                    {community.name}
                                </Text>
                                {community.isJoined && (
                                    <Badge count="Joined" style={{ backgroundColor: "#e6f7f1", color: "#1a936f" }} />
                                )}
                            </Space>
                        }
                        description={
                            <Space direction="vertical" size="small">
                                <Text type="secondary">{community.description}</Text>
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                    {community.members.toLocaleString()} members
                                </Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

function PostsResults({ posts }: { posts: any[] }) {
    return (
        <List
            dataSource={posts}
            renderItem={(post) => (
                <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    style={{ padding: "12px" }}
                    actions={[<ArrowRightOutlined key="arrow" style={{ color: "#1a936f" }} />]}
                >
                    <List.Item.Meta
                        avatar={<FileTextOutlined style={{ fontSize: "24px", color: "#1a936f" }} />}
                        title={
                            <Text strong style={{ fontSize: "16px", color: "#1a936f" }}>
                                {post.title}
                            </Text>
                        }
                        description={
                            <Space direction="vertical" size="small">
                                <Space size="small">
                                    <Text type="secondary">by {post.author}</Text>
                                    <Text type="secondary">•</Text>
                                    <Text type="secondary">in {post.community}</Text>
                                    <Text type="secondary">•</Text>
                                    <Text type="secondary">{post.timeAgo}</Text>
                                </Space>
                                <Space size="large">
                                    <Text type="secondary" style={{ fontSize: "12px" }}>
                                        {post.likes} likes
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: "12px" }}>
                                        {post.comments} comments
                                    </Text>
                                </Space>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

function UsersResults({ users }: { users: any[] }) {
    return (
        <List
            dataSource={users}
            renderItem={(user) => (
                <List.Item
                    className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    style={{ padding: "12px" }}
                    actions={[
                        <Button
                            key="follow"
                            type={user.isFollowing ? "default" : "primary"}
                            size="small"
                            icon={user.isFollowing ? <CheckCircleOutlined /> : undefined}
                        >
                            {user.isFollowing ? "Following" : "Follow"}
                        </Button>,
                        <ArrowRightOutlined key="arrow" style={{ color: "#1a936f" }} />,
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                size={48}
                                src={user.avatar || "/default-user.jpeg"}
                                icon={<UserOutlined />}
                                style={{ border: "2px solid #f0f0f0" }}
                            />
                        }
                        title={
                            <Space>
                                <Text strong style={{ fontSize: "16px" }}>
                                    {user.displayName}
                                </Text>
                                {user.isFollowing && (
                                    <Badge count="Following" style={{ backgroundColor: "#e6f7f1", color: "#1a936f" }} />
                                )}
                            </Space>
                        }
                        description={
                            <Space direction="vertical" size="small">
                                <Text type="secondary">@{user.username}</Text>
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                    {user.followers.toLocaleString()} followers
                                </Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

function EmptySearchState({
                              recentSearches,
                              trendingTopics,
                              onSearchClick,
                          }: {
    recentSearches: string[]
    trendingTopics: string[]
    onSearchClick: (query: string) => void
}) {
    return (
        <div className="p-6">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {/* Recent Searches */}
                <div>
                    <Title level={5} style={{ marginBottom: "16px", color: "#1a936f" }}>
                        <ClockCircleOutlined style={{ marginRight: "8px" }} />
                        Recent Searches
                    </Title>
                    <List
                        dataSource={recentSearches}
                        renderItem={(search) => (
                            <List.Item
                                className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                style={{ padding: "8px 12px" }}
                                onClick={() => onSearchClick(search)}
                            >
                                <List.Item.Meta
                                    avatar={<SearchOutlined style={{ color: "#1a936f" }} />}
                                    title={<Text style={{ color: "#1a936f" }}>{search}</Text>}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                {/* Trending Topics */}
                <div>
                    <Title level={5} style={{ marginBottom: "16px", color: "#1a936f" }}>
                        <FireOutlined style={{ marginRight: "8px" }} />
                        Trending Topics
                    </Title>
                    <Space wrap>
                        {trendingTopics.map((topic, index) => (
                            <Tag
                                key={index}
                                color="default"
                                style={{
                                    cursor: "pointer",
                                    borderColor: "#1a936f",
                                    color: "#1a936f",
                                    fontSize: "14px",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                }}
                                onClick={() => onSearchClick(topic)}
                                className="hover:bg-green-50"
                            >
                                {topic}
                            </Tag>
                        ))}
                    </Space>
                </div>

                {/* Empty State */}
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <Space direction="vertical" align="center">
                            <Text type="secondary" style={{ fontSize: "16px" }}>
                                Start typing to search
                            </Text>
                            <Text type="secondary">Find communities, posts, and users across the platform</Text>
                        </Space>
                    }
                />
            </Space>
        </div>
    )
}
