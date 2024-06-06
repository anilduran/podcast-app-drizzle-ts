import { relations } from "drizzle-orm";
import { boolean, pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    profilePhotoUrl: varchar('profile_photo_url'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})

export const usersRelations = relations(users, ({ many }) => ({
    podcastLists: many(podcastLists),
    podcasts: many(podcasts),
    podcastListComments: many(podcastListComments),
    podcastComments: many(podcastComments),
    playlists: many(playlists),
    subscriptions: many(podcastListSubscriptions),
    history: many(listeningHistory)
}))

export const categories = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull()
})

export const podcastLists = pgTable('podcast_lists', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    creatorId: uuid('creator_id'),
    imageUrl: varchar('image_url'),
    isPublic: boolean('is_public').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})

export const podcastListsRelations = relations(podcastLists, ({ one, many }) => ({
    creator: one(users, {
        fields: [podcastLists.creatorId],
        references: [users.id]
    }),
    comments: many(podcastListComments),
    categories: many(podcastListCategories),
    subscribers: many(podcastListSubscriptions)
}))

export const podcastListPodcasts = pgTable('podcast_list_podcasts', {
    podcastListId: uuid('podcast_list_id').references(() => podcastLists.id),
    podcastId: uuid('podcast_id').references(() => podcasts.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.podcastId, t.podcastListId] })
}))

export const podcastListPodcastsRelations = relations(podcastListPodcasts, ({ one }) => ({
    podcasts: one(podcasts, {
        fields: [podcastListPodcasts.podcastId],
        references: [podcasts.id]
    }),
    podcastLists: one(podcastLists, {
        fields: [podcastListPodcasts.podcastListId],
        references: [podcastLists.id]
    })
}))

export const podcastListCategories = pgTable('podcast_list_categories', {
    podcastListId: uuid('podcast_list_id').references(() => podcastLists.id),
    categoryId: uuid('category_id').references(() => categories.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.podcastListId, t.categoryId] })
}))

export const podcastListCategoriesRelations = relations(podcastListCategories, ({ one }) => ({
    podcastList: one(podcastLists, {
        fields: [podcastListCategories.podcastListId],
        references: [podcastLists.id]
    }),
    category: one(categories, {
        fields: [podcastListCategories.categoryId],
        references: [categories.id]
    })
}))

export const podcasts = pgTable('podcasts', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    creatorId: uuid('creator_id'),
    imageUrl: varchar('image_url'),
    podcastUrl: varchar('podcast_url'),
    isPublic: boolean('is_public').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})

export const podcastsRelations = relations(podcasts, ({ one, many }) => ({
    creator: one(users, {
        fields: [podcasts.creatorId],
        references: [users.id]
    }),
    comments: many(podcastComments),
    categories: many(podcastCategories)
}))

export const podcastCategories = pgTable('podcast_categories', {
    podcastId: uuid('podcast_id').references(() => podcasts.id),
    categoryId: uuid('category_id').references(() => categories.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.podcastId, t.categoryId] })
}))

export const podcastCategoriesRelations = relations(podcastCategories, ({ one }) => ({
    podcast: one(podcasts, {
        fields: [podcastCategories.podcastId],
        references: [podcasts.id]
    }),
    category: one(categories, {
        fields: [podcastCategories.categoryId],
        references: [categories.id]
    })
}))

export const podcastListComments = pgTable('podcast_list_comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    podcastListId: uuid('podcast_list_id'),
    content: varchar('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})

export const podcastListCommentsRelations = relations(podcastListComments, ({ one }) => ({
    user: one(users, {
        fields: [podcastListComments.userId],
        references: [users.id]
    }),
    podcastList: one(podcastLists, {
        fields: [podcastListComments.podcastListId],
        references: [podcastLists.id]
    })
}))

export const podcastComments = pgTable('podcast_comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    podcastId: uuid('podcast_id'),
    content: varchar('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})  

export const podcastCommentsRelations = relations(podcastComments, ({ one }) => ({
    user: one(users, {
        fields: [podcastComments.userId],
        references: [users.id]
    }),
    podcast: one(podcasts, {
        fields: [podcastComments.podcastId],
        references: [podcasts.id]
    })
}))

export const playlists = pgTable('playlists', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    imageUrl: varchar('image_url').notNull(),
    creatorId: uuid('creator_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})

export const playlistRelations = relations(playlists, ({ one }) => ({
    creator: one(users, {
        fields: [playlists.creatorId],
        references: [users.id]
    })
}))

export const playlistPodcasts = pgTable('playlist_podcasts', {
    playlistId: uuid('playlist_id').references(() => playlists.id),
    podcastId: uuid('podcast_id').references(() => podcasts.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.playlistId, t.podcastId] })
}))

export const playlistPodcastsRelations = relations(playlistPodcasts, ({ one }) => ({
    podcast: one(podcasts, {
        fields: [playlistPodcasts.podcastId],
        references: [podcasts.id]
    }),
    playlist: one(playlists, {
        fields: [playlistPodcasts.playlistId],
        references: [playlists.id]
    })
}))

export const podcastListSubscriptions = pgTable('podcast_list_subscriptions', {
    podcastListId: uuid('podcast_list_id').references(() => podcastLists.id),
    userId: uuid('user_id').references(() => users.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.podcastListId, t.userId] })
}))

export const podcastListSubscriptionsRelations = relations(podcastListSubscriptions, ({ one }) => ({
    podcastList: one(podcastLists, ({
        fields: [podcastListSubscriptions.podcastListId],
        references: [podcastLists.id]
    })),
    user: one(users, {
        fields: [podcastListSubscriptions.userId],
        references: [users.id]
    })
}))

export const podcastLikes = pgTable('podcast_likes', {
    userId: uuid('user_id').references(() => users.id),
    podcastId: uuid('podcast_id').references(() => podcasts.id)
}, (t) => ({
    pk: primaryKey({ columns: [t.userId, t.podcastId] })
}))

export const podcastLikesRelations = relations(podcastLikes, ({ one }) => ({
    user: one(users, {
        fields: [podcastLikes.userId],
        references: [users.id]
    }),
    podcast: one(podcasts, {
        fields: [podcastLikes.podcastId],
        references: [podcasts.id]
    })
}))

export const listeningHistory = pgTable('listening_history', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    podcastId: uuid('podcast_id'),
    createdAt: timestamp('created_at').defaultNow()    
})

export const listeningHistoryRelations = relations(listeningHistory, ({ one }) => ({
    user: one(users, {
        fields: [listeningHistory.userId],
        references: [users.id]
    }),
    podcast: one(podcasts, {
        fields: [listeningHistory.podcastId],
        references: [podcasts.id]
    })  
}))